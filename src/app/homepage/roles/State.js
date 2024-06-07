'use client';
import { useNotifications } from '@usedapp/core';

export default function State() {
  const { notifications } = useNotifications();

  return (
    <div className="global">
      <p>HomePage State</p>
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
