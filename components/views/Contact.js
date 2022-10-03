import html from "html-literal";

export default state => html`
  <main>
    <div class="flex-buffer"></div>
    <div class="flex-container-form">
      <div class="contact-form">
        <form
          action="https://formspree.io/f/xyyvebrg"
          method="POST"
          enctype="multipart/form-data"
        >
          <label id="contact-form-input"
            >Your email:
            <input type="email" name="email" id="sub-form-input-email" />
          </label>
          <label id="contact-form-input"
            >Subject:
            <input type="text" name="subject" id="sub-form-input-subject" />
          </label>
          <label id="contact-form-input-inline" for="Description of Issue"
            >Select Issue:
            <select
              name="Description of Issue"
              id="sub-form-input-issue"
              required
            >
              <option disabled selected value> -- select an option -- </option>
              <option value="Software Issue">Software Issue</option>
              <option value="Request Training">Request Training</option>
              <option value="Feedback">Submit Feedback</option>
              <option value="Sales">Sales</option>
              <option value="Demo">Request Demonstration</option>
            </select>
          </label>
          <label id="contact-form-input"
            >Issue Description:
            <textarea
              name="detailed-description"
              id="sub-form-input-description"
              rows="5"
            ></textarea>
          </label>
          <label id="contact-form-input"
            >Upload file:
            <input type="file" name="upload" id="sub-form-input-file" />
          </label>
          <button type="submit" id="sub-form-input-submit">Send</button>
        </form>
      </div>
    </div>
  </main>
`;
