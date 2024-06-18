import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { ProfileUI } from '@ui-pages';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { updateUserApi, getUserApi } from '../../utils/burger-api';

export const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserApi();
        if (userData.success) {
          setFormValue({
            name: userData.user.name,
            email: userData.user.email,
            password: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const userDataToUpdate = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password || undefined
    };

    try {
      const updatedUser = await updateUserApi(userDataToUpdate);
      if (updatedUser.success) {
        setIsFormChanged(false);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsFormChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setIsFormChanged(true);
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
