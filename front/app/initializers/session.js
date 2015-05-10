export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('route', 'session', 'service:session');
  application.inject('controller', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize: initialize
};
