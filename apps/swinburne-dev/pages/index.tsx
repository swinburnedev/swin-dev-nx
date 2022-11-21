import Link from 'next/link';
import { ImageCaption } from '@swin-dev-nx/shared/ui';
import { Layout } from '../components/layout';


export function Index() {
    return (
        <Layout>
          <div className="grid">
            <div className="grid-rows-1 grid-cols-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 py-10">
                    Hi, I'm Andy &#128075;
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                  <div className="max-w-4xl">
                  <h2>Senior Frontend Engineer</h2>

                    <p>A little bit more about me:</p>
                    <i>Personal:</i>
                    <ul>
                      <li>Married</li>
                      <li>2 kids</li>
                      <li>Runner</li>
                      <li>Gardener</li>
                      <li>Coder</li>
                    </ul>
                    <i>Professional:</i>
                    <ul>
                      <li>15 years experience</li>
                      <li>Frontend engineer</li>
                      <li>React</li>
                      <li>Performance</li>
                      <li>Accessibility</li>
                      <li>Usability</li>
                      <li>Full CV</li>
                    </ul>
                    <Link className="block pt-10" href='/projects'>
                        Projects
                    </Link>
                    <p>Code for this site, take a look:</p>
                  </div>
                  <div className="max-w-4xl">
                    <ImageCaption 
                      alt="Andy Swinburne"
                      caption="I'm the one on the right :)"
                      url="/images/andy.jpeg"  
                    />
                  </div>
              </div>
          </div>
        </Layout>
    );
}

export default Index;
