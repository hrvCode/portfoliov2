(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    // console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var data = getFormData(form);         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md*/
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }

    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          // console.log(xhr.status, xhr.statusText);
          // console.log(xhr.responseText);
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector("#thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }

  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      buttons[i].style.background= "#f3f3f3";
    }
  }


  /**
   * record_data inserts the data received from the html form submission
   * e is the data received from the POST
   */
  function record_data(e) {
    var lock = LockService.getDocumentLock();
    lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing

    try {
      Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it

      // select the 'responses' sheet by default
      var doc = SpreadsheetApp.getActiveSpreadsheet();
      var sheetName = e.parameters.formGoogleSheetName || "responses";
      var sheet = doc.getSheetByName(sheetName);

      var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var newHeader = oldHeader.slice();
      var fieldsFromForm = getDataColumns(e.parameters);
      var row = [new Date()]; // first element in the row should always be a timestamp

      // loop through the header columns
      for (var i = 1; i < oldHeader.length; i++) { // start at 1 to avoid Timestamp column
        var field = oldHeader[i];
        var output = getFieldFromData(field, e.parameters);
        row.push(output);

        // mark as stored by removing from form fields
        var formIndex = fieldsFromForm.indexOf(field);
        if (formIndex > -1) {
          fieldsFromForm.splice(formIndex, 1);
        }
      }

      // set any new fields in our form
      for (var i = 0; i < fieldsFromForm.length; i++) {
        var field = fieldsFromForm[i];
        var output = getFieldFromData(field, e.parameters);
        row.push(output);
        newHeader.push(field);
      }

      // more efficient to set values as [][] array than individually
      var nextRow = sheet.getLastRow() + 1; // get next row
      sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

      // update header row with any new data
      if (newHeader.length > oldHeader.length) {
        sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
      }
    }
    catch(error) {
      Logger.log(error);
    }
    finally {
      lock.releaseLock();
      return;
    }

  }

  function getDataColumns(data) {
    return Object.keys(data).filter(function(column) {
      return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
    });
  }

  function getFieldFromData(field, data) {
    var values = data[field] || '';
    var output = values.join ? values.join(', ') : values;
    return output;
  }
})();
