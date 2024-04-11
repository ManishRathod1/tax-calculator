$(document).ready(function() {
  // Enable tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  // Function to validate input and display error icon
function validateInput(inputField, errorIcon) {
  var value = inputField.val();

  // Check if the input field is the age field
  if (inputField.attr('id') === 'age') {
    var ageErrorIcon = inputField.siblings('.error-icon');
    if (!value) {
      // If age field is empty, show error icon and set tooltip message
      ageErrorIcon.css('display', 'block').attr('title', 'Please select an age group');
    } else {
      // Otherwise, hide error icon
      ageErrorIcon.css('display', 'none').attr('title', '');
    }
  } else {
    // For text fields
    if (!$.isNumeric(value)) {
      errorIcon.css('display', 'block').attr('title', 'Please enter a number');
    } else {
      errorIcon.css('display', 'none').attr('title', '');
    }
  }
}


  // Function to calculate tax
  function calculateTax() {
    var annualIncome = parseFloat($('#annualIncome').val()) || 0;
    var extraIncome = parseFloat($('#extraIncome').val()) || 0;
    var totalDeduction = parseFloat($('#totalDeduction').val()) || 0;
    var age = $('#age').val();
    var tax = 0;

    // Calculate total income after deductions
    var totalIncome = annualIncome + extraIncome - totalDeduction;

    // Apply tax calculation rules based on age and income
    if (totalIncome <= 800000) {
      // No tax if income is less than or equal to 8 Lakhs
      tax = 0;
    } else {
      // Calculate tax for income over 8 Lakhs
      var incomeOver8Lakhs = totalIncome - 800000;
      if (age === '<40') {
        tax = incomeOver8Lakhs * 0.3;
      } else if (age === '>=40&<60') {
        tax = incomeOver8Lakhs * 0.4;
      } else if (age === '>=60') {
        tax = incomeOver8Lakhs * 0.1;
      }
    }

    return tax;
  }

  // Error icon handling on input change
  $('input[type="text"], select').on('input change', function() {
    var inputField = $(this);
    var errorIcon = inputField.siblings('.error-icon');
    validateInput(inputField, errorIcon);
  });

  // Error icon handling on form submit
  $('#taxCalculatorForm').submit(function(event) {
    // Validate input fields
    $(this).find('input[type="text"], select').each(function() {
      var inputField = $(this);
      var errorIcon = inputField.siblings('.error-icon');
      validateInput(inputField, errorIcon);
    });

    // Prevent form submission if there are errors
    if ($(this).find('.error-icon:visible').length > 0) {
      event.preventDefault();
    } else {
      // Calculate and display tax if there are no errors
      var tax = calculateTax();
      $('#taxResultText').text(tax.toFixed(2));
      console.log('Tax to be paid:', tax.toFixed(2), 'Lakhs');

      // Show the modal
      $('#taxResultModal').modal('show');

      // Prevent default form submission behavior
      event.preventDefault();
    }
  });
});

// Tooltip functionality
document.addEventListener("DOMContentLoaded", function() {
  const infoIcons = document.querySelectorAll('.info-icon');
      
  // Initialize tooltips
  infoIcons.forEach(function(icon) {
    icon.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'tooltip';
      tooltipElement.innerHTML = tooltipText;
      document.body.appendChild(tooltipElement);
      
      const rect = this.getBoundingClientRect();
      const top = rect.top - tooltipElement.offsetHeight - 10;
      const left = rect.left + (rect.width - tooltipElement.offsetWidth) / 2;
      
      tooltipElement.style.top = top + 'px';
      tooltipElement.style.left = left + 'px';
    });
    
    icon.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
});