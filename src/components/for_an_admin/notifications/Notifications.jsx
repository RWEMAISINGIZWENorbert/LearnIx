import React, {useState, useEffect} from 'react'
import './notifications.css'
import { DeleteConfirmation } from '../../shared/DeleteConfirmation'
import { MdAllInbox,MdOutlineManageAccounts } from 'react-icons/md'
import { CiSearch } from 'react-icons/ci'
import { GoUnread } from 'react-icons/go'
import { IoLockOpenOutline,IoChatbubblesOutline, IoMailOpenOutline, IoTrashBinOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

export const Notifications = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const ua = navigator.userAgent;

    const isMobile = /Mobi|Android/i.test(ua);
    const os = /Windows/i.test(ua)
      ? 'Windows'
      : /Mac/i.test(ua)
      ? 'MacOS'
      : /Android/i.test(ua)
      ? 'Android'
      : /iPhone|iPad/i.test(ua)
      ? 'iOS'
      : 'Unknown';

    setDeviceInfo({
      userAgent: ua,
      isMobile,
      os,
    });
  }, []);

  const handleDeleteAllNotifications = () => {
    // Handle deletion logic here
    console.log('Deleting all notifications');
    setShowDeleteConfirm(false);
  };



  return (
    <div className='notifications'>
        <div className="box">
          <div className="up">
            <h3>Notifications</h3>
            <p>Stay updated with the latest alerts, messages, and system announcements.</p>
          </div>
          <div className="mid">
            <div className="left">
              <div className="up">
                <div className="divs div1">
                  <div className="i">
                      <div className="icon">
                        <MdAllInbox  />
                      </div>
                  </div>
                  <div className="des">
                    <h4>All</h4>
                    <p><span className="counter">20</span><div className="separator"></div><span className="describe">Notifications</span></p>
                  </div>
                </div>
                <div className="divs div2">
                  <div className="i">
                      <div className="icon">
                        <GoUnread />
                      </div>
                  </div>
                  <div className="des">
                    <h4>Unread</h4>
                    <p><span className="counter">5</span><div className="separator"></div><span className="describe">Notifications</span></p>
                  </div>
                </div>
                <div className="divs div3">
                  <div className="i">
                      <div className="icon">
                        <IoLockOpenOutline />
                      </div>
                  </div>
                  <div className="des">
                    <h4>Security</h4>
                    <p><span className="counter">2</span><div className="separator"></div><span className="describe">Notifications</span></p>
                  </div>
                </div>
                <div className="divs div4">
                  <div className="i">
                      <div className="icon">
                        <IoChatbubblesOutline />
                      </div>
                  </div>
                  <div className="des">
                    <h4>Messages</h4>
                    <p><span className="counter">3</span><div className="separator"></div><span className="describe">Notifications</span></p>
                  </div>
                </div>
                <div className="divs div5">
                  <div className="i">
                      <div className="icon">
                        <MdOutlineManageAccounts />
                      </div>
                  </div>
                  <div className="des">
                    <h4>Academic update</h4>
                    <p><span className="counter">3</span><div className="separator"></div><span className="describe">Notifications</span></p>
                  </div>
                </div>
              </div>
              <div className="down">
                <div className="mark">
                  <button><IoMailOpenOutline className='icon'/><span>Mark all as read</span></button>
                </div>
                <div className="del">
                  <button onClick={() => setShowDeleteConfirm(true)}><IoTrashBinOutline className='icon'/><span>Delete all notifications</span></button>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="up">
                <h4>Recent Notifications</h4>
              </div>
              <div className="mini_up">
                <div className="search_box">
                  <div className="search">
                    <div className="icon"><CiSearch /></div>
                    <input type="text" placeholder='Search for notifications . . .' />
                  </div>
                  <div className="button">
                    <button>Search</button>
                  </div>
                </div>
              </div>
              <div className="middle">
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification academic_update">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Academic update</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New assessment marks</h4>
                          <p>Teacher RWEMA Nobii inserted Mobile App assessment marks for L5 SOD A</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification message">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Message</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New message from Teacher Franco</h4>
                          <p>Dear Admin, I would like to tell that tomorrow I will not be available because of family matter.</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification message">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Message</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New message from Teacher Shema</h4>
                          <p>Dear Admin, I would like to tell that tomorrow I will not be available because of family matter.</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
                <div className="notification security">
                  <div className="upper">
                    <div className="leftside">
                      <p><span className="noti_">Notification</span><div className="separator"></div><div className="noti_type security">Security</div></p>
                    </div>
                    <div className="rightside">
                      <p className="counter"><span className='count'>8 hours</span> ago</p>
                    </div>
                  </div>
                  <div className="lower">
                      <div className="l">
                          <h4>New login alert on other device</h4>
                          <p>You account is logged in on another device: {deviceInfo.userAgent}</p>
                      </div>
                      <div className="r">
                        <div className="not_read"></div>
                      </div>
                  </div>
                  <div className="more security">
                    <button><span>view more</span><FaLongArrowAltRight className='icon'/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmation
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteAllNotifications}
          itemName="all notifications"
          itemType="notification group"
        />
    </div>
  )
}
