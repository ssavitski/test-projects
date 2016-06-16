define([
    'coreJS/adapt'
],function(Adapt) {

    Adapt.on('questionView:showFeedback', function(view) {

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage")
        };

        if (view.model.has('_isCorrect')) {
            var answerIndicator = '';
            // Attach specific classes so that feedback can be styled.
            if (view.model.get('_isCorrect')) {
                answerIndicator = '<b>Correct! </b>';
                alertObject._classes = 'correct';
            } else {
                if (view.model.has('_isAtLeastOneCorrectSelection')) {
                    // Partially correct feedback is an option.
                    answerIndicator = view.model.get('_isAtLeastOneCorrectSelection')
                        ? '<b>Partially correct! </b>'
                        : '<b>Incorrect! </b>';
                    alertObject._classes = view.model.get('_isAtLeastOneCorrectSelection')
                        ? 'partially-correct'
                        : 'incorrect';
                } else {
                    answerIndicator = '<b>Incorrect! </b>';
                    alertObject._classes = 'incorrect';
                }
            }
            alertObject.title = answerIndicator + alertObject.title;
        }

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened');
    });

});
