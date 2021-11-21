import React from "react";
import { Grid, Header, Segment, Input } from "semantic-ui-react";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

import "./SuccessCard.css";
import { Link } from "react-router-dom";

import { BASE_URL } from "../constants";

const SuccessCard = (props) => {
  const { url } = props; // server response
  return (
    <Grid stretched>
      <Grid.Row centered verticalAlign="middle">
        <Header size="huge" textAlign="center" inverted>
          <span>Link Generated Successfully!</span>
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign="center" className="success-subtitles">
          <p>Click the button below to copy your link to the clipboard.</p>
          <p>Happy sharing and trolling.</p>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign="center">
          <Segment>
            <p>{url.url}</p>
            <Input
              className="url-field"
              fluid
              type="text"
              disabled
              value={`${url.id}`}
              name="url"
              action={{
                color: "blue",
                icon: "copy",
                content: "Copy Link",
                onClick: () => {
                  copy(`${BASE_URL}/${url.id}`);
                  toast.success("URL copied to clipboard");
                },
              }}
            />
            <p className="success-card-subtitle">
              {url.probability}% probability •
              <Link to={`/stats/${url.id}`}> view stats</Link>
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SuccessCard;
