import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = (props) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location])
    
    return props.children;
}

export default withRouter(ScrollToTop);
 