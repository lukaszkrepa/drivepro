import { withAuthenticator } from '@aws-amplify/ui-react';

function AdminPanel() {
    return <div>Welcome, Admin! [edit UI here]</div>;
}

export default withAuthenticator(AdminPanel);