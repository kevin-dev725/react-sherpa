import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCampaign } from '../../store/Campaigns/selectors';
import { createFollowupCampaign } from '../../store/Campaigns/thunks';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import { resetCampaignListTabs } from '../../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/actions';
import { createFollowupMessage } from '../../helpers/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CreateFollowup(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFailedResponse, setIsFailedResponse] = useState(false);
    const attrs = {
        cancelBtn: { "data-test": "cancel-followup-btn" },
        createBtn: { "data-test": "create-followup-btn" }
    }

    const dispatch = useDispatch();
    const currentCampaignId = useParams().id;
    const currentCampaign = useSelector(getCampaign(currentCampaignId));
    const history = useHistory();

    const createFollowup = () => {
        setIsSubmitting(true);
        setIsFailedResponse(false);
        dispatch(createFollowupCampaign(currentCampaign)).then(xhr => {
            setIsSubmitting(false);
            if (xhr.status === 201) {
                props.toggle();
                dispatch(resetCampaignListTabs());
                history.push(`/campaign/${xhr.data.id}/details`);
            } else {
                setIsFailedResponse(true);
            }
        });
    }

    const closeModal = () => {
        setIsFailedResponse(false);
        props.toggle();
    };
   
    return (
      <>  
        <div>
            <p>{createFollowupMessage}</p>
        </div>

        <Button color='primary' size='md' block className='mt-2' {...attrs.createBtn} onClick={createFollowup} >
          <LoadingSpinner
            isLoading={isSubmitting}
            color='light'
            renderContent={() => <>{isFailedResponse ? "Try Again" : "Continue"}</>} />
        </Button>
        <Button color='link' size='md' block {...attrs.cancelBtn} onClick={closeModal}>
            Cancel
        </Button>
        </>
    )
}

export default CreateFollowup;
