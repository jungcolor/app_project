import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Input, Label, Button } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
    show: boolean;
    onCloseModal: () => void;
    setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
    const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
    const [newMember, onChangeNewMember, setnewMember] = useInput('');
    const { data: userData } = useSWR<IUser | false>(`http://localhost:3095/api/users`, fetcher, {
        dedupingInterval: 2000, // 2초
    });
    const { mutate: mutateMember } = useSWR<IUser[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher);

    const onInviteMember = useCallback((e) => {
        e.preventDefault();

        if (!newMember || !newMember.trim()) return;

        axios.post(`http://localhost:3095/api/workspaces/${workspace}/channels/${channel}/members`, {
            email: newMember
        }, {
            withCredentials: true
        })
            .then(() => {
                mutateMember();
                setShowInviteChannelModal(false);
                setnewMember('');
            })
            .catch((error) => {
                console.dir(error);
                toast.error(error.response?.data, { position: 'bottom-center' });
            });
    }, [newMember]);

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onInviteMember}>
                <Label id="member-label">
                    <span>채널 멤버 초대</span>
                    <Input id="member" value={newMember} onChange={onChangeNewMember} />
                </Label>
                <Button type="submit">생성하기</Button>
            </form>
        </Modal>
    );
};

export default InviteChannelModal;