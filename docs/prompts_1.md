now there I have another feature in it which is Assignemt management which I want to improve on the another level also. current implementation. 1.Any teacher craetes assignement basically with the those fields Title, Description , Due Date , Class [it uses also the default values hence not work] [<div className="form_field">
                  <label>Class <span className="required">*</span></label>
                  <select value={assignmentClass} onChange={(e) => setAssignmentClass(e.target.value)}>
                    <option value="">Select class</option>
                    <option value="L5 SOD A">L5 SOD A</option>
                    <option value="L5 SOD B">L5 SOD B</option>
                    <option value="L6 SOD A">L6 SOD A</option>
                    <option value="L6 SOD B">L6 SOD B</option>
                  </select>
                </div>], Attach File (Optional), Voice Note (Optional) and also when the assigned created it is distributed  each/all students in that school get that assignment while it have to belong to the assigned class(es) only. 