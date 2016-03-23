(function() {
  $(function() {
    var ID, setValues;
    (function() {
      $('.form > input, .variant-selector > input').keyup(function() {
        var empty;
        empty = false;
        $('.form > input').each(function() {
          if ($(this).val() === '') {
            empty = true;
          }
        });
        if (empty) {
          $('#calculate').attr('disabled', 'disabled');
        } else {
          $('#calculate').removeAttr('disabled');
        }
      });
    })();
    ID = function() {
      return Math.random().toString(36).substr(2, 19);
    };
    setValues = function() {
      var alfaXML, code, description, email, firstname, mobphone, price, reference, tour;
      reference = ID();
      tour = $('input[name=variant]:checked').val();
      firstname = $('input#firstname').val();
      mobphone = $('input#mobphone').val();
      email = $('input#email').val();
      if (tour === 'base') {
        code = 111;
        price = 29900;
        description = 'Путевка в лагерь Материк по программе База';
      } else if (tour === 'optima') {
        code = 222;
        price = 34900;
        description = 'Путевка в лагерь Материк по программе Оптима';
      } else if (tour === 'progress') {
        code = 333;
        price = 39900;
        description = 'Путевка в лагерь Материк по программе Прогресс';
      }
      $.ajax({
        url: "https://formspree.io/alfa@namaterik.ru",
        method: "POST",
        data: {
          message: 'Новая заявка на кредит!',
          name: firstname,
          phone: mobphone,
          email: email,
          tour_variant: tour,
          tour_code: code,
          reference: reference
        },
        dataType: "json"
      });
      alfaXML = "<inParams><companyInfo><inn>7708276320</inn></companyInfo><creditInfo><reference>" + reference + "</reference></creditInfo><clientInfo><firstname>" + firstname + "</firstname><email>" + email + "</email><mobphone>" + mobphone + "</mobphone></clientInfo><specificationList><specificationListRow><category>Tourism</category><code>" + code + "</code><description>" + description + "</description><amount>1</amount><price>" + price + "</price></specificationListRow></specificationList></inParams>";
      $('textarea#alfaXMLField').html(alfaXML);
      return alfaXML;
    };
    return $('#calculate').click(function() {
      setValues();
      $('#alfaXMLForm').submit();
      $('input#firstname').val('');
      $('input#mobphone').val('');
      $('input#email').val('');
      $('textarea#alfaXMLField').html('');
      return $('#calculate').attr('disabled', 'disabled');
    });
  });

}).call(this);
