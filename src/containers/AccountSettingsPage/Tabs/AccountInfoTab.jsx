import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeMarkets } from '../../../store/Markets/selectors';
import { fetchMarkets } from '../../../store/Markets/actions';
import Modal from '../../../components/Modal';
import UpdatePasswordForm from './forms/UpdatePasswordForm';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MarketSection from './AccountInfoTabSections/MarketSection';
import SettingsForm from './forms/SettingsForm';
import NewMarketForm from './forms/NewMarketForm';

function AccountInfoTab(props) {
  // local state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newMarketModalOpen, setNewMarketModalOpen] = useState(false);

  //modal toggles
  const passModalToggle = () => setPasswordModalOpen(state => !state);
  const newMarketModalToggle = () => setNewMarketModalOpen(state => !state);

  // selectors
  const markets = useSelector(activeMarkets);

  const plusIcon = <FontAwesomeIcon icon="plus-circle" />;
  const dispatch = useDispatch();

  // fetch markets if not already in the store
  useEffect(() => {
    if (markets.length === 0) {
      dispatch(fetchMarkets());
    }
  }, []);

  // header buttons
  const accountHeaderBtns = (
    <div className="d-flex align-items-end">
      <Button onClick={passModalToggle} className="mr-2" color="secondary" data-test='change-password-btn' size="md">Change Password</Button>
      <Modal dataTest="change-password-modal" title="Change Password" isOpen={passwordModalOpen} toggle={passModalToggle}>
        <UpdatePasswordForm toggle={passModalToggle} />
      </Modal>
      <Button color="primary" size="md" onClick={() => { }}>
        Save Changes
      </Button>
    </div>
  );

  const marketsHeaderBtns = (
    <div className="d-flex align-items-end">
      <Button onClick={newMarketModalToggle} className="mr-2" color="primary" data-test='new-market-btn' size="md">{plusIcon}New Market</Button>
      <Modal dataTest="new-market-modal" title="New Market" isOpen={newMarketModalOpen} toggle={newMarketModalToggle}>
        <NewMarketForm toggle={newMarketModalToggle} />
      </Modal>
    </div>
  );


  // header components
  const accountHeader = (
    <SectionHeader
      title="Account Information"
      btns={accountHeaderBtns}
    />
  );

  const marketsHeader = (
    <SectionHeader
      title="Markets"
      btns={marketsHeaderBtns}
    />
  );

  return (
    <>
      <SettingsSection type="form" header={accountHeader}>
        <SettingsForm />
      </SettingsSection>

      <SettingsSection type="list" header={marketsHeader}>
        <MarketSection />
      </SettingsSection>
    </>
  );
}

export default AccountInfoTab;
