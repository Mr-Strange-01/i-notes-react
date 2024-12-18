// utils/notify.js
import $ from 'jquery';
import 'bootstrap-notify';

export const showNotification = (message, type = 'success') => {
    $.notify(
      { message },
      { 
        type,
        placement: {
          from: "top",
          align: "right",
        },
        delay: 1500,
      }
    );
  };
  