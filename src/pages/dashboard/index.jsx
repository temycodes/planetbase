import React, { useEffect } from "react";
import EventLayout from "../../layouts/events-layout";
import { FiSearch } from "react-icons/all";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export function NoEvents() {
  return (
    <div className="event-rows">
      <img
        src={
          "https://res.cloudinary.com/dputu7z0u/image/upload/v1660863670/Rectangle_31_ad96pw.svg"
        }
        alt="a picture of an event image"
      />
      <div>
        <h3>Events</h3>
        <div>
          <p>{"No Update"}</p>
        </div>
      </div>
      <div>
        <h3>Date</h3>
        <div>
          <p>{"No Date"}</p>
        </div>
      </div>
      <div>
        <h3>Status</h3>
        <div>
          <p>{"No Status"}</p>
        </div>
      </div>
    </div>
  );
}
//
function EventProfile() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const url = "https://planetbase-api.onrender.com/api/events/organizer-events";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!token) {
      navigate("/login");
    }
    Axios.get(url, config)
      .then((res) => {
        console.log(res.data.events);
        setEvents(res.data.events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "8rem" }}>
        Fetching All Events... This may take some time
      </h3>
    );
  } else {
    return (
      <EventLayout>
        <div className="event-container">
          <br />
          <h2>{localStorage.getItem("firstname")}'s Organization Events</h2>
          <div>
            <div className="event-input">
              <div className="search-events">
                <FiSearch />
                <input type="text" placeholder="Search for your event" />
              </div>
              <div className="event-btn">
                <Link to="/create-event" className="custom-btn">
                  <span className="custom-span">Create Event</span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  eventImage={event.eventImage}
                  eventDate={event.scheduledDate}
                  eventTitle={event.eventTitle}
                  // eventDesc={event.eventDesc}
                  key={event._id}
                />
              ))
            ) : (
              <NoEvents />
            )}
          </div>
        </div>
      </EventLayout>
    );
  }
}

export default EventProfile;

export function EventCard({
  eventImage,
  key,
  eventDate,
  eventTitle,
  eventDesc,
}) {
  return (
    <div className="event-rows" key={key}>
      <img src={eventImage} alt="a picture of an event image" />
      <div>
        <h3>Events</h3>
        <div>
          <p>{eventTitle}</p>
          {/* <p>{eventDesc}</p> */}
        </div>
      </div>
      <div>
        <h3>Date</h3>
        <div>
          <p>{eventDate}</p>
        </div>
      </div>
      <div>
        <h3>Status</h3>
        <div>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}
