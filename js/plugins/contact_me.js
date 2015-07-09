$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $form.find('#name').val();
            var email = $form.find("#email").val();
            var phone = $form.find("#phone").val();
            var message = $form.find("textarea#message").val();
            var donemsg = $form.find("#donemsg").val() || "Your message has been sent.";
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName && firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://docs.google.com/forms/d/1EvUn1TdIRLvrRQDXkAvFTmCSooemOP2espZu6Vh0m0I/formResponse",
                type: "POST",
                data: {
                    "entry.1750661056": name,
                    "entry.988437689": phone,
                    "entry.1462418853": email,
                    "entry.1726596499": message
                },
                cache: false,
                // HACK: google forms: due to CORS the response fails, but it does post the request
                error: function() {
                    // Success message
                    var $success = $form.find('.success');
                    $success.html("<div class='alert alert-success'>");
                    var $successalert = $success.find('.alert-success');
                    $successalert.html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $successalert.append("<strong>"+donemsg+"</strong>");
                    $successalert.append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                }
                // error: function() {
                //     // Fail message
                //     $('#success').html("<div class='alert alert-danger'>");
                //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //     $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                //     $('#success > .alert-danger').append('</div>');
                //     //clear all fields
                //     $('#contactForm').trigger("reset");
                // },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
