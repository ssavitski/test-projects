define([
    'coreJS/adapt',
    'handlebars'
],function(Adapt, Handlebars) {

    Adapt.on('questionView:showFeedback', function(view) {

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage")
        };
        var template = Handlebars.templates['answerStatus'];

        if (view.model.has('_isCorrect')) {
            var answerIndicator = '';
            // Attach specific classes so that feedback can be styled.
            if (view.model.get('_isCorrect')) {
                alertObject._classes = 'correct';
                answerIndicator = template({ 
                	answerStatus: 'Correct!',
                	className: alertObject._classes
                });
            } else {
                if (view.model.has('_isAtLeastOneCorrectSelection')) {
                    // Partially correct feedback is an option.
                    alertObject._classes = view.model.get('_isAtLeastOneCorrectSelection')
                        ? 'partially-correct'
                        : 'incorrect';
                    answerIndicator = view.model.get('_isAtLeastOneCorrectSelection')
                        ? template({ 
                        	answerStatus: 'Partially correct!',
                        	className: alertObject._classes
                        })
                        : template({ 
                        	answerStatus: 'Incorrect',
                        	className: alertObject._classes
                        });
                } else {
                	alertObject._classes = 'incorrect';
                    answerIndicator = template({ 
                    	answerStatus: 'Incorrect',
                    	className: alertObject._classes
                    });
                }
            }
            alertObject.title = answerIndicator;
        }

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened');
    });

});
