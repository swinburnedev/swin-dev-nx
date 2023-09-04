// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {Footer} from "@swin-dev-nx/shared/ui"
import NxWelcome from './nx-welcome';

export function App() {
  return (
      <div>
          <NxWelcome title="test-app" />
          <Footer />
      </div>
  )
}

export default App;
