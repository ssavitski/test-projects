import Ember from 'ember';
import moment from 'moment';

export function fromDate(theDate) {
  const today = moment();
  const target = moment(theDate);

  return target.from(today);
}

export default Ember.Helper.helper(fromDate);
