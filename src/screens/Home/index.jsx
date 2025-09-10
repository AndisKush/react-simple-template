import { useDevice } from '../../hooks/useDevice';
import DashboardWidescreen from '../Dashboard/DashboardWidescreen';
import DashboardMobile from '../Dashboard/DashboardMobile';

const HomeScreen = () => {
  const { isMobile } = useDevice();

  // Renderiza a versão do dashboard apropriada para o dispositivo
  return isMobile ? <DashboardMobile /> : <DashboardWidescreen />;
};

export default HomeScreen;