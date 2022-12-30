import React, { useEffect, useState, useContext } from "react";
import firebaseConfig from "../firebase_config";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from "firebase/auth";
import swal from 'sweetalert';

import { AuthContext } from "./Auth"

const Login = () => {
	const [user, setUser] = useState(null);
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");
	const [expandForm, setExpandForm] = useState(false);
	const [hideSendOtpBtn, sethideSendOtpBtn] = useState(true);
	const [disabledPhoneField, setDisabledPhoneField] = useState(false);
	const [disabledLoginBtn, setDisabledLoginBtn] = useState(true);

	// const { currentUser } = useContext(AuthContext);
	// if (currentUser) {
	// 	return <Redirect to="/dashboard" />;
	// }

	// เช็คว่าใส่เบอร์มาครบ 10 หลักหรือยัง ถ้าครบแล้วให้แสดงปุ่ม Send OTP
	const chackPhone = (e) => {
		if (e.target.value.length === 10) {
			sethideSendOtpBtn(false);
			setPhone(e.target.value);
		} else {
			sethideSendOtpBtn(true);
		}
	};
	const chackOtp = (e) => {
		if (e.target.value.length === 6) {
			setDisabledLoginBtn(false);
			setOtp(e.target.value);
		} else {
			setDisabledLoginBtn(true);
		}
	};

	const generateRecaptcha = () => {
		const auth = getAuth(firebaseConfig);
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: (response) => {
					swal("ส่ง OTP สำเร็จ", "กรุณาตรวจสอบ OTP ที่มือถือ", "success");
					// onSignInSubmit();
				},
				defaultCountry: "TH",
			},
			auth
		);
	};

	const requestOTP = (e) => {
		e.preventDefault();
		setDisabledPhoneField(true);
		sethideSendOtpBtn(true);
		setExpandForm(true);

		generateRecaptcha();
		const phoneNumber = "+66" + phone;
		const appVerifier = window.recaptchaVerifier;
		const auth = getAuth(firebaseConfig);
		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
			});
	};

	const login = (e) => {
		e.preventDefault();
		const code = otp;
		confirmationResult
			.confirm(code)
			.then((result) => {
				// User signed in successfully.
				const user = result.user;
				swal("ล็อกอินสำเร็จ", "ยินดีต้อนรับ: "+ user.phoneNumber, "success");
			})
			.catch((error) => {
				// User couldn't sign in (bad verification code?)
				swal("รหัส OTP ไม่ถูกต้อง", "กรุณาลองอีกครั้ง", "warning");
			});
	};
	return (
		<dev>
			<form>
				<div className="input-group mb-3">
					<input
						onChange={chackPhone}
						disabled={disabledPhoneField}
						type="text"
						name="phone"
						className="form-control"
						placeholder="กรอกเบอร์โทรศัพท์"
						aria-label="กรอกเบอร์โทรศัพท์"
						aria-describedby="phoneHelp"
					/>
					<dev className="input-group-append"></dev>
					<button
						onClick={requestOTP}
						className="btn btn-outline-dark"
						type="button"
						disabled={hideSendOtpBtn}
					>
						ส่ง OTP
					</button>
				</div>

				{expandForm === true ? (
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								OTP
							</span>
						</div>
						<input
							onChange={chackOtp}
							type="text"
							name="otp"
							className="form-control"
							placeholder="กรอกรหัส OTP"
							aria-label="กรอกรหัส OTP"
							aria-describedby="basic-addon1"
						/>
					</div>
				) : null}

				<div className="mb-3 form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="exampleCheck1"
					/>
					<label className="form-check-label" for="exampleCheck1">
						I agree to the Teams & Conditions and Privacy Policy.
					</label>
				</div>
				<div id="recaptcha-container"></div>
				<button
					onClick={login}
					disabled={disabledLoginBtn}
					type="submit"
					className="btn btn-primary"
				>
					Login
				</button>
				
			</form>
		</dev>
	);
};

export default Login;
