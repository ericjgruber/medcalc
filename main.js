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
      // BMI (Body mass index): (w/2.2)/(0.0254H) 2 = X kg/m 2

      var weight = jQuery('input[name="weight"]').val();
      var weightMetric = weight / 2.2;
      var heightInches = jQuery('input[name="height"]').val();
      var heightMetric = heightInches * 0.0254;
      var heightResult = heightMetric * heightMetric;
      var age = jQuery('input[name="age"]').val();
      var height = jQuery('input[name="height"]').val();
      var gender = jQuery('input[name="gender"]:checked').val();
      var kcal = jQuery('input[name="kcal"]').val();

      var bmiResult = weightMetric / heightResult;
      var bmiTotals = bmiResult.toFixed();

      // Get BMR:
      // Male
      if (gender == "male") {
        // (old, but correct?)
        // var bmrTotals = 66 + (6.2 * weight) + (12.7 * heightInches) - (6.76 * age);
        // Client provided: (10w/2.2) + (0.15875h) – (5A) + 5
        var bmrTotals = (10 * weight/2.2) + (0.15875 * heightInches) - (5 * age) + 5;
      }
      // Female
      else if (gender == "female") {
        // (old, but correct?
        // var bmrTotals = 655.1 + (4.35 * weight) + (4.7 * heightInches) - (4.7 * age);
        // Client provided: (10w/2.2) + (0.15875h) – (5A) – 161
        var bmrTotals = (10 * weight/2.2) + (0.15875 * heightInches) - (5 * age) - 161;
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

      jQuery('#bmiResult').html("<strong>Body Mass Index (BMI) is " + bmiTotals + "</strong>");
      jQuery('#bmrResult').html("<strong>Basal Metabolic Rate (BMR) is " + bmrTotals + " calories.</strong>");
      jQuery('#suggestedActivity').html("<strong>Your suggested caloric intake based on your activity level is " + activity + " calories</strong>");

    }
  }
});