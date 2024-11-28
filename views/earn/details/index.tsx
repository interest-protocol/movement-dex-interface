import { v4 } from 'uuid';

import EarnCard from '../earn-card';
import { EARN_CARD_DATA } from '../earn-card/earn-card.data';
import EarnCardWrapper from '../earn-card-wrapper';

const EarnCardDetails = () => {
  return (
    <EarnCardWrapper>
      {EARN_CARD_DATA.map(
        ({ label, tokenName, balance, TokenIcon, earnAmount }) => {
          return (
            <EarnCard
              label={label}
              tokenName={tokenName}
              key={v4()}
              balance={balance}
              TokenIcon={TokenIcon}
              earnAmount={earnAmount}
            />
          );
        }
      )}
    </EarnCardWrapper>
  );
};
export default EarnCardDetails;
