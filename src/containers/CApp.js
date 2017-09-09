import { connect } from 'react-redux';
import App from '../components/App';
import { setLine } from '../actions/highlight';

const mapStateToProps = (state) => {
  return {
    currentLine: state.highlight.line,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLine: (line) => {
      dispatch(setLine(line));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

