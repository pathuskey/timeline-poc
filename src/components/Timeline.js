import React from "react"
import TimelineEvent from "./TimelineEvent"
import { useInView } from "react-intersection-observer"

import "./timeline.scss"

export default ({ events }) => {
  const [ref, inView] = useInView({
    threshold: events && events.length > 0 ? 1 / events.length : 0,
  })

  return (
    <section
      ref={ref}
      className={`timeline ${inView ? "timeline--inview" : ""}`}
    >
      <div className="timeline__events">
        {events.map((event, i) => {
          return (
            <TimelineEvent
              key={i}
              {...event}
              next={i < events.length ? events[i + 1] : null}
              previous={i !== 0 ? events[i - 1] : null}
              style={{ "--index": i }}
              className={
                i % 2 === 0 ? "timeline-event--odd" : "timeline-event--even"
              }
              events={events}
            />
          )
        })}
      </div>
    </section>
  )
}
