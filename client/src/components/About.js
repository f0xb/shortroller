import React, { useState } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";

import "./About.css";

const about = [
  {
    title: "How does the service decide whether or not to troll?",
    content: "content",
  },
  { title: "place holder", content: "place holder" },
  { title: "place holder", content: "place holder" },
  { title: "place holder", content: "place holder" },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Segment inverted>
      <Accordion inverted>
        {about.map((item, index) => (
          <>
            <Accordion.Title
              active={activeIndex === index}
              index={0}
              onClick={() =>
                setActiveIndex(index === activeIndex ? null : index)
              }
            >
              <Icon name="dropdown" />
              {item.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <p>{item.content}</p>
            </Accordion.Content>
          </>
        ))}
      </Accordion>
    </Segment>
  );
};

export default About;
