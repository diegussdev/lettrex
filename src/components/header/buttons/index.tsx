import { StyledButtons } from '../../../styles/components/header/buttons/buttons';
import ShareButton from './share';
import StatisticButton from './statistic';

export default function Buttons() {
  return (
    <StyledButtons>
      <StatisticButton />
      <ShareButton />
    </StyledButtons>
  );
}