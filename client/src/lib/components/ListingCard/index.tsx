import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Tag, Typography } from "antd";
import { iconColor, formatListingPrice } from "../../utils";
import { ListingType } from "../../graphql/globalTypes";

interface Props {
  listing: {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
  };
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props) => {
  const { id, title, image, address, price } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="listing-card__cover-img"
          />
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              {formatListingPrice(price)}
              <span>
                {" "}
                m<sup>2</sup>
              </span>
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {title}
            </Text>
            <Text ellipsis className="listing-card__address">
              {address}
            </Text>
          </div>

          {/* <div className="listing-card__dimensions listing-card__dimensions--guests">
            <Icon type="home" style={{ color: iconColor }} />
          </div> */}
        </div>
      </Card>
    </Link>
  );
};