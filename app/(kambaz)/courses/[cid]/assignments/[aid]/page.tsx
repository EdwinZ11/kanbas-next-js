export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
  <td align="right" valign="top">
    <label htmlFor="wd-assignment-group">Assignment Group</label>
  </td>
  <td>
    <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
      <option value="ASSIGNMENTS">ASSIGNMENTS</option>
      <option value="QUIZZES">QUIZZES</option>
      <option value="EXAMS">EXAMS</option>
      <option value="PROJECT">PROJECT</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-display-grade-as">Display Grade As</label>
  </td>
  <td>
    <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
      <option value="PERCENTAGE">Percentage</option>
      <option value="POINTS">Points</option>
      <option value="LETTER_GRADE">Letter Grade</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-submission-type">Submission Type</label>
  </td>
  <td>
    <select id="wd-submission-type" defaultValue="ONLINE">
      <option value="ONLINE">Online</option>
      <option value="ON_PAPER">On Paper</option>
      <option value="NO_SUBMISSION">No Submission</option>
    </select>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label>Online Entry Options</label>
  </td>
  <td>
    <label htmlFor="wd-text-entry">
      <input type="checkbox" id="wd-text-entry" /> Text Entry
    </label>
    <br />
    <label htmlFor="wd-website-url">
      <input type="checkbox" id="wd-website-url" defaultChecked /> Website URL
    </label>
    <br />
    <label htmlFor="wd-media-recordings">
      <input type="checkbox" id="wd-media-recordings" /> Media Recordings
    </label>
    <br />
    <label htmlFor="wd-student-annotation">
      <input type="checkbox" id="wd-student-annotation" /> Student Annotation
    </label>
    <br />
    <label htmlFor="wd-file-uploads">
      <input type="checkbox" id="wd-file-uploads" /> File Uploads
    </label>
  </td>
</tr>

<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-assign-to">Assign</label>
  </td>
  <td>
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <label htmlFor="wd-assign-to">Assign to</label>
      <br />
      <input id="wd-assign-to" defaultValue="Everyone" />
      <br />
      <br />

      <label htmlFor="wd-due-date">Due</label>
      <br />
      <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
      <br />
      <br />

      <label htmlFor="wd-available-from">Available from</label>
      <br />
      <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
      <br />
      <br />

      <label htmlFor="wd-available-until">Until</label>
      <br />
      <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
    </div>
  </td>
</tr>

        </table>
      </div>
  );}
  
  