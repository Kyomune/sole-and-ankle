import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANTS = {
  "on-sale": {
    background: COLORS.primary,
    content: "Sale",
  },

  "new-release": {
    background: COLORS.secondary,
    content: "Just Released!",
  },

  default: {
    display: "none",
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  if (!VARIANTS[variant]) {
    throw new Error(`No variant found for ${variant}`);
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />

          <TagItem style={{ "--background": VARIANTS[variant].background }}>
            <TagCaption>{VARIANTS[variant].content}</TagCaption>
          </TagItem>
        </ImageWrapper>

        <Spacer size={14} />

        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>

        <Spacer size={6} />

        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>

          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  padding-right: 4px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration-line: strikethrough;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const TagItem = styled.span`
  position: absolute;
  top: 10px;
  right: -10px;
  border-radius: 2px;
  color: ${COLORS.white};
  background-color: var(--background);
  padding: 10px;
`;

const TagCaption = styled.span`
  font-weight: ${WEIGHTS.medium};
  font-size: 14px / 16px;
`;

export default ShoeCard;
