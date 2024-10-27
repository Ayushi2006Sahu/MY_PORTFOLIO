
import  { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Ensure the access key is set
  const apiKey = process.env.PUBLIC_ACCESS_KEY || "85a2e3d0-d247-4ff5-be57-47b32136663b";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg || "Success. Message sent successfully.");
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg || "Something went wrong. Please try again later.");
    },
  });

  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>
        <Desc>We'd love to hear from you!</Desc>
        <ContactForm>
          <ContactTitle>Get in Touch</ContactTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="my-10">
            <ContactInput
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <small style={{ color: "red" }}>{errors.name.message}</small>}
<br/><br/>
            <ContactInput
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Enter your email" })}
            />
            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
<br/> <br/>
            <ContactInputMessage
              placeholder="Your Message"
              {...register("message", { required: "Enter your message" })}
            />
            {errors.message && <small style={{ color: "red" }}>{errors.message.message}</small>}

            <ContactButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </ContactButton>
          </form>

          {isSubmitSuccessful && (
            <div style={{ marginTop: "20px", color: isSuccess ? "green" : "red" }}>
              {message}
            </div>
          )}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};




//default_service
//template_xltbv9l