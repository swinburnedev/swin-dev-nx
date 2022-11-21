import Link from 'next/link';
import { ImageCaption } from '@swin-dev-nx/shared/ui';
import { Layout } from '../components/layout';


export function Index() {
    return (
        <Layout>
          <div className="grid">
            <div className="grid-cols-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 pt-10">
                    Hi, I'm Andy <span role="img" aria-label="waving hand" style={{lineHeight: 1}}>👋</span>
                </h1>
                <h2 className="text-xl sm:text-xl font-bold text-slate-900 tracking-tight dark:text-slate-200 pt-5">Senior Frontend Engineer</h2>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                <div className="max-w-4xl">
                    <p className="py-4">A little bit about me:</p>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                      <div className="max-w-4xl">
                        <i>Personal:</i>
                        <ul className="py-4">
                          <li><span role="img" aria-label="family: man, woman, girl, boy" style={{lineHeight: 1}}>👨‍👩‍👧‍👦</span> Family man</li>
                          <li><span role="img" aria-label="rugby football" style={{lineHeight: 1}}>🏉</span> Rugby fan</li>
                          <li><span role="img" aria-label="man running" style={{lineHeight: 1}}>🏃‍♂️</span> Runner</li>
                          <li><span role="img" aria-label="seedling" style={{lineHeight: 1}}>🌱</span> Gardener</li>
                          <li><span role="img" aria-label="man biking" style={{lineHeight: 1}}>🚴‍♂️</span> Cyclist</li>
                        </ul>
                      </div>
                      <div className="max-w-4xl">
                        <i>Professional:</i>
                        <ul className="py-4">
                          <li><span role="img" aria-label="alarm clock" style={{lineHeight: 1}}>⏰</span> 15 years experience</li>
                          <li><span role="img" aria-label="man technologist" style={{lineHeight: 1}}>👨‍💻</span> Frontend engineer</li>
                          <li><span role="img" aria-label="atom symbol" style={{lineHeight: 1}}>⚛</span> React</li>
                          <li><span role="img" aria-label="rocket" style={{lineHeight: 1}}>🚀</span> Performance</li>
                          <li><span role="img" aria-label="man bowing" style={{lineHeight: 1}}>🙇‍♂️</span> Accessibility</li>
                        </ul>
                      </div>
                    </div>
                    <ul className="py-4">
                      <li><p>Want to see the code for this site? <Link href='https://github.com/swinburnedev/swin-dev-nx'>Take a look on Github</Link> <span role="img" aria-label="eyes" style={{lineHeight: 1}}>👀</span></p></li>
                      <li className="block py-4">Or view my <Link href='/pdf/CV_Swinburne_Andy_website.pdf'>full CV</Link></li>
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
