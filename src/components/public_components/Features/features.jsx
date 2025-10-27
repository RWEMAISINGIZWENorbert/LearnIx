import React from 'react';
import SplitText from "../../public_components/animations/SplitText";
import './features.css'
import BlurText from "../../public_components/animations/BlurText";


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export const Features_component = () => {
  return (
    <div className='Features_component'>
      <div className="gradient"></div>
        <div className="whole_box">
                <div className="box box1">
              <div className="leftside">
                <div className="data">
                  <div className="schools_count">
                    <p className="schools_count_p">🥳 2.5K +  books across our platform. </p>
                  </div>
                  <div className="big_one">
                    <div className="step">
                      <p className="step_p">
                        <span className="purple">
                            <SplitText
                            text="Learning"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          /> &nbsp;
                          </span> 
                          <SplitText
                            text="books &"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                            />
                        </p>
                    </div>
                    <div className="future">
                      <p className="future_p">
                          <SplitText
                            text="N"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="o"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="v"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="e"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="ls!"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        </p>
                    </div>
                  </div>
                  <div className="description">
                    <p className="description_p">
                      <BlurText
                        text="Access a wide collection of learning books, study guides, and novels designed to support both academic success and personal growth. Students can easily explore textbooks by subject, download recommended readings, and enjoy novels that improve language skills and creativity. With organized categories and a simple search tool, finding the right book has never been easier."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                      />
                    </p>
                  </div>
                  <div className="buttons">
                    <div className="get_started">
                      <button>Get books</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightside">
                <img src={`${import.meta.env.BASE_URL}assets/student_in_library.png`} alt="Student in Library" />
              </div>
            </div>
            
          
                <div className="box box2">
              <div className="leftside">
                <div className="data">
                  <div className="big_one">
                    <div className="step">
                      <p className="step_p">
                        <span className="purple">
                            <SplitText
                            text="Student’s"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          /> &nbsp;
                          </span> 
                          <SplitText
                            text="past"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                            />
                        </p>
                    </div>
                    <div className="future">
                      <p className="future_p">
                          <SplitText
                            text="P"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="a"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="p"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="e"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="ls!"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        </p>
                    </div>
                  </div>
                  <div className="description">
                    <p className="description_p">
                      <BlurText
                        text="Prepare smarter with instant access to past exam papers from schools across Rwanda. Students can search by subject, year, or level to practice real exam questions and improve performance. Teachers can also use the archive as a reference for creating new tests and guiding learners. With easy viewing and download options, past papers are always within reach."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                      />
                    </p>
                  </div>
                  <div className="buttons">
                    <div className="get_started">
                      <button>Get started</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightside">
                <img src={`${import.meta.env.BASE_URL}assets/student_past_papers.png`} alt="Student viewing her past papers" />
              </div>
            </div>
           
           
                <div className="box box3">
              <div className="leftside">
                <div className="data">
                  <div className="big_one">
                    <div className="step">
                      <p className="step_p">
                        <span className="purple">
                            <SplitText
                            text="College & "
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          /> &nbsp;
                          </span> 
                          <SplitText
                            text="school"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                            />
                        </p>
                    </div>
                    <div className="future">
                      <p className="future_p">
                          <SplitText
                            text="App"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="li"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="cat"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        <span className="purple">
                          <SplitText
                            text="io"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />  
                        </span>
                          <SplitText
                            text="n!"
                            className="text-2xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        </p>
                    </div>
                  </div>
                  <div className="description">
                    <p className="description_p">
                      <BlurText
                        text="Simplify the admission process with our digital application system. Students can apply to schools and colleges directly through the platform, submit required documents, and track their application status in real time. Schools benefit from a centralized system that organizes applications, reduces paperwork, and speeds up admissions."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                      />
                    </p>
                  </div>
                  <div className="buttons">
                    <div className="get_started">
                      <button>View schools</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightside">
                <img src={`${import.meta.env.BASE_URL}assets/student_applying.png`} alt="Student applying" />
              </div>
            </div>
          

            
            
            
      </div>
    </div>
  )
}
