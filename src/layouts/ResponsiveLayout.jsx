import { useDevice } from '../hooks/useDevice';
import WidescreenLayout from './WidescreenLayout';
import MobileLayout from './MobileLayout';

const ResponsiveLayout = ({ children }) => {
  const { isMobile } = useDevice();

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }

  return <WidescreenLayout>{children}</WidescreenLayout>;
};

export default ResponsiveLayout;