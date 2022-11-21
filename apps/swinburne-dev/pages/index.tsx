import Link from 'next/link';
import { ImageCaption } from '@swin-dev-nx/shared/ui';
import { Layout } from '../components/layout';


export function Index() {
    return (
        <Layout>
          <div className="grid">
            <div className="grid-rows-1 grid-cols-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 pt-10">
                    Hi, I'm Andy &#128075;
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                  <div className="max-w-4xl">
                  <h2 className="text-xl sm:text-xl font-bold text-slate-900 tracking-tight dark:text-slate-200 pt-5">Senior Frontend Engineer</h2>

                    <p className="py-4">A little bit more about me:</p>
                    <i>Personal:</i>
                    <ul className="py-4">
                      <li>Married</li>
                      <li>2 kids</li>
                      <li>Runner</li>
                      <li>Gardener</li>
                      <li>Coder</li>
                    </ul>
                    <i>Professional:</i>
                    <ul className="py-4">
                      <li>15+ years experience</li>
                      <li>Frontend engineer</li>
                      <li>React</li>
                      <li>Performance</li>
                      <li>Accessibility</li>
                      <li>Usability</li>
                    </ul>
                    <ul className="py-4">
                      <li><Link href='/cv'>View full CV</Link></li>
                      <li><Link href='/projects'>
                        Projects
                    </Link></li>
                      <li><Link href='https://github.com/swinburnedev/swin-dev-nx'>Code for this site, take a look</Link></li>
                    </ul>
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
