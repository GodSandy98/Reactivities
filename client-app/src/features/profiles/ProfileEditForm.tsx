import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { Form, Formik } from "formik"
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {

    const { profileStore } = useStore();
    const { updateProfile, profile } = profileStore;

    return (
        <Formik
            initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
            onSubmit={values => updateProfile(values).then(() => setEditMode(false))}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextArea rows={3} placeholder="Add your bio" name="bio" />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated="right"
                        positive type="submit" content="Update profile" />
                </Form>
            )
            }
        </Formik>
    )
})