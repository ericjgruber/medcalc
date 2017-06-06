var vm = new Vue({
  el: '#medcalc',
  data: {
    heading: "MedCalc",
    weight: '',
    weightMetric: '',
    heightInches: '',
    heightMetric: '',
    heightResult: '',
    age: '',
    gender: '',
    height: '',
    kcal: '',
    activity: ''
  },
  methods: {
    calculatedTotals: function() {
      // BMI formula taken from
      // http://extoxnet.orst.edu/faqs/dietcancer/web2/twohowto.html

      var weight = jQuery('input[name="weight"]').val();
      var weightMetric = weight * 0.45;
      var heightInches = jQuery('input[name="height"]').val();
      var heightMetric = heightInches * 0.025;
      var heightResult = heightMetric * heightMetric;
      var age = jQuery('input[name="age"]').val();
      var height = jQuery('input[name="height"]').val();
      var gender = jQuery('input[name="gender"]:checked').val();
      var kcal = jQuery('input[name="kcal"]').val();

      var bmiResult = weightMetric / heightResult;
      var bmiTotals = bmiResult.toFixed();

      // Get BMR:
      // Men: 66 + (6.2 * weight in lbs.) + (12.7 * height in inches) - (6.76 * age in years)
      // Women: 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) - ( 4.7 × age in years )
      // Male
      if (gender == "male") {
        var bmrTotals = 66 + (6.2 * weight) + (12.7 * heightInches) - (6.76 * age);
      }
      // Female
      else if (gender == "female") {
        var bmrTotals = 655.1 + (4.35 * weight) + (4.7 * heightInches) - (4.7 * age);
      }

      var bmrTotals = bmrTotals.toFixed();

      var activity = jQuery('input[name="activity"]:checked').val();

      switch (activity) {
        case "0":
          var activity = bmrTotals * 1.2;
          break;
        case "1":
          var activity = bmrTotals * 1.375;
          break;
        case "2":
          var activity = bmrTotals * 1.55;
          break;
        case "3":
          var activity = bmrTotals * 1.725;
          break;
        case "4":
          var activity = bmrTotals * 1.9;
          break;
        default:
      }

      var activity = activity.toFixed();

      jQuery('#bmrResult').html("<strong>Your BMR is " + bmrTotals + " calories.</strong>");
      jQuery('#bmiResult').html("<strong>Your BMI is " + bmiTotals + "</strong>");
      jQuery('#suggestedActivity').html("<strong>Your suggested caloric intake based on your activity level is " + activity + " calories</strong>");

    }
  }
});