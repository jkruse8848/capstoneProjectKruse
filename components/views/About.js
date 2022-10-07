import html from "html-literal";

export default state =>
  html`
    <main>
      <div class="about-page">
        <div class="about-text-container">
          <div class="icon-header-about"></div>
          <h1>About Cayenne for Law Enforcement</h1>
          <h3>Origin</h3>
          <p>
            Cayenne was started in 2022 to address the urgent need for a facial
            recognition platform for Law Enforcement Professionals. With the
            proliferation of current technology, today crime is frequently
            captured on camera. From smartphones to doorbell cameras, to
            security cameras, to body-worn cameras, to dash-cams, suspects find
            themselves on video frequently. The creator of the platform has a
            personal story that impacted the design and helped highlight the
            crucial need for functional facial recognition technology in Law
            Enforcement that protects citizens and accurately identifies
            criminals. The video below shows the creator of Cayenne's vehicle
            being broken into by 5 individuals in the early hours of a weekend
            morning. Not seen in the video, the individual taking the video
            yelled out their window for the team of thugs to stop breaking into
            vehicles. One of the criminals turned around, pulled a gun from
            their pocket and fired it through the window just above the head of
            the person that asked them to stop.
          </p>
          <div class="video-embed">
            <video controls>
              <source src="./assets/vid/breakin.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p>
            In addition to the smartphone video, the perpetrators were captured
            on several doorbell cameras and security cameras installed along the
            street by residents. The police were unsuccessful in apprehending
            any of these criminals even with clear video taken that showed
            everyone's face. In the 21st century, the best this police
            department could do was post this tweet asking the public for
            assistance. Conveniently, Nashville Metro Police Department left out
            the part about violent crime and the shooting that had occurred.
          </p>
          <div class="tweet-embed"></div>
          <p>
            While the comment section is rightfully filled with people calling
            out the Nashville Metro Police Department on the failure to do their
            jobs, a large part of what ties police departments' hands is lack of
            functional technology to allow them to quickly and accurately
            identify suspects. From this Cayenne was created to allow Law
            Enforcement professionals to integrate records management systems,
            upload photos and videos of suspects, and run that media against
            Jail Management System data to return matches for criminals.
          </p>
          <h3>How it Works</h3>
          <p>
            The Cayenne system has two primary operating modes, upload and
            integration. On the home screen any Law Enforcement professional can
            upload photos and videos, assign a case number and a justification,
            and run facial recognition against the photo to return potential
            matches. The Cayenne platform operates completely agnostic to any
            proprietary Artificial Intelligence Facial Recognition models. The
            platform is a framework that allows <b>ANY</b> model to be run
            against
            <b>ANY</b>
            media. A variety of models are run on the data and the search
            results return likely matches. Those matches provide critical leads
            in otherwise blocked cases.
          </p>
          <h3>Commitment to Privacy and Civil Liberties</h3>
          <p>
            The Cayenne platform does not arbitrarily crawl image repositories
            or social media for data. The facial recognition is strictly limited
            to individuals that have previously been encountered by law
            enforcement and arrested. The philosophy is, if someone steals a
            package off your porch, it's probably not the first crime they've
            committed.
          </p>
          <h3>Use for Your Organization</h3>
          <p>
            If you are interested in a first-class facial recognition platform
            for your agency, please reach out using the contact page.
          </p>
        </div>
      </div>
    </main>
  `;
