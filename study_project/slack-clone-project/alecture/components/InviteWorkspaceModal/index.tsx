import { BACK_URL } from '@components/global';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Input, Label, Button } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
    show: boolean;
    onCloseModal: () => void;
    setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: VFC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
    const { workspace } = useParams<{ workspace: string; channel: string }>();
    const [newMember, onChangeNewMember, setNewMember] = useInput('');
    const { data: userData } = useSWR<IUser | false>(`${BACK_URL}/api/users`, fetcher, {
        dedupingInterval: 2000, // 2초
    });
    const { mutate: mutateMember } = useSWR<IChannel[]>(userData ? `${BACK_URL}/api/workspaces/${workspace}/members` : null, fetcher);

    const onInviteMember = useCallback((e) => {
        e.preventDefault();

        if (!newMember || !newMember.trim()) return;

        axios.post(`${BACK_URL}/api/workspaces/${workspace}/members`, {
            email: newMember
        }, {
            withCredentials: true
        })
            .then(() => {
                mutateMember();
                setShowInviteWorkspaceModal(false);
                setNewMember('');
            })
            .catch((error) => {
                console.dir(error);
                toast.error(error.response?.data, { position: 'bottom-center' });
            });
    }, [workspace, newMember]);

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onInviteMember}>
                <Label id="member-label">
                    <span>이메일</span>
                    <Input id="member" value={newMember} onChange={onChangeNewMember} />
                </Label>
                <Button type="submit">초대하기</Button>
            </form>
        </Modal>
    );
};

export default InviteWorkspaceModal;