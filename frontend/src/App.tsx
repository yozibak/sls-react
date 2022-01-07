import { Ghost } from './pages/ghost/root';
import { withAuthenticator } from '@aws-amplify/ui-react';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <Ghost />
    </div>
  );
}

export default withAuthenticator(App);
