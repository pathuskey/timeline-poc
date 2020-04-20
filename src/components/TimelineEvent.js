import React from "react"
import Img from "gatsby-image"
import { toKebabCase } from "../utilities"
import { Link } from "react-scroll"
import { Container } from "reactstrap"
import { useInView } from "react-intersection-observer"
import Zoom from "react-medium-image-zoom"

import "./timelineEvent.scss"
import "react-medium-image-zoom/dist/styles.css"

const ScrollLink = ({ date, text, className }) => (
  <Link
    className={`timeline-event__nav-link p-3 d-xl-none ${className}`}
    to={toKebabCase(date)}
    smooth
  >
    <small>{text}</small>
  </Link>
)

export default ({
  date,
  title,
  text,
  image,
  next,
  previous,
  className,
  events,
  ...attrs
}) => {
  const THRESHOLD = [0.25, 0.5, 0.75]
  const [ref, inView] = useInView({
    threshold: THRESHOLD,
    triggerOnce: true,
  })

  return (
    <div
      id={date ? toKebabCase(date) : ""}
      ref={ref}
      className={`timeline-event ${
        inView ? "timeline-event--viewed" : ""
      } ${className || ""}`}
      {...attrs}
    >
      {events && events.length > 0 && (
        <div className="timeline-event__menu d-none d-xl-block">
          {events.map((event, i) => {
            if (event && event.date) {
              return (
                <Link
                  key={i}
                  className="timeline-event__menu-item"
                  activeClass="timeline-event__menu-item--active"
                  to={toKebabCase(event.date)}
                  spy
                  smooth
                >
                  <span className="timeline-event__menu-item__text">
                    {event.date}
                  </span>
                </Link>
              )
            }

            return null
          })}
        </div>
      )}

      {previous && previous.date && (
        <ScrollLink
          date={previous.date}
          text="Previous"
          className="timeline-event__nav-link--prev"
        />
      )}

      <Container className="timeline-event__container">
        {date && (
          <h2 className="timeline-event__date display-4 font-weight-bold py-3 mb-0">
            <span className="timeline-event__line timeline-event__line--top" />
            <div className="timeline-event__date-inner">{date}</div>
            <span className="timeline-event__line timeline-event__line--bottom" />
          </h2>
        )}

        {(title || text) && (
          <div className="timeline-event__content py-2">
            <div className="timeline-event__content-inner">
              {title && (
                <p className="timeline-event__title h5 text-uppercase">
                  {title}
                </p>
              )}
              {text && (
                <p className="timeline-event__text mb-0 font-italic">{text}</p>
              )}
            </div>
          </div>
        )}

        {image && (
          <Zoom wrapStyle={{ width: 700, maxWidth: "90%" }} zoomMargin={40}>
            <div className="timeline-event__img-wrapper">
              <div className="timeline-event__img-inner shadow">
                <Img
                  className="timeline-event__img"
                  fluid={image.childImageSharp.fluid}
                  alt={title || date}
                />
              </div>
            </div>
          </Zoom>
        )}
      </Container>

      {next && next.date && (
        <ScrollLink
          date={next.date}
          text="Next"
          className="timeline-event__nav-link--next"
        />
      )}
    </div>
  )
}
