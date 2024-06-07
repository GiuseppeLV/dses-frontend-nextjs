'use client';

import { useNotifications } from '@usedapp/core';
import Image from 'next/image';
import adminPic from '../../../admin.jpg';

export default function Admin() {
  const { notifications } = useNotifications();
  return (
    <div className="global">
      <Image
        src={adminPic}
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <p>HomePage admin</p>
      <div>
        {notifications.length !== 0 && (
          <table>
            <th>Type</th>
            <th>Date</th>
            {notifications.map((notification) => {
              return (
                <tr>
                  <td>
                    <h3>{notification.type}</h3>
                  </td>
                  <td>{new Date(notification.submittedAt).toDateString()}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}
