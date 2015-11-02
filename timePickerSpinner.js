 $(function () {
     $('#seconds').spinner({
         step  : 15,
         icons: {
            down : "ui-icon-minusthick", up: "ui-icon-plusthick"
         },
         spin: function (event, ui) {
             if (ui.value >= 60) {
                 $(this).spinner('value', ui.value - 60);
                 $('#minutes').spinner('stepUp');
                 return false;
             } else if (ui.value < 0) {
                 $(this).spinner('value', ui.value + 60);
                 $('#minutes').spinner('stepDown');
                 return false;
             }
         }
     });
     $('#minutes').spinner({
        icons: {
            down : "ui-icon-minusthick", up: "ui-icon-plusthick"
         },
         spin: function (event, ui) {
             if (ui.value >= 45) {
                 $(this).spinner('value', 45);
                 return false;
             } else if (ui.value < 0) {
                 $(this).spinner('value', 0);
                 return false;
             }
         }
     });
 });
