import React from 'react';
import { Composition, Sequence, AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';

// مكون الفيديو الرئيسي
export const KindergartenPrimaryRegistration = () => {
    return (
          <AbsoluteFill style={{ backgroundColor: '#1a472a' }}>
            {/* العنوان الرئيسي */}
                  <Sequence from={0} durationInFrames={120}>
                            <Title />
                  </Sequence>Sequence>

            {/* متطلبات التسجيل - السن المؤهل */}
                  <Sequence from={130} durationInFrames={150}>
                            <RequirementCard 
                                        title="السن المؤهل للتسجيل"
                                        content="رياض الأطفال: 3-5 سنوات&#10;الم رحلة الابتدائية: 6 سنوات فما فوق"
                                        backgroundColor="#2d5a3d"
                                      />
                  </Sequence>Sequence>

            {/* متطلبات التسجيل - الفحص الطبي */}
                  <Sequence from={290} durationInFrames={150}>
                            <RequirementCard 
                                        title="فحص اللياقة الطبية"
                                        content="يجب إجراء فحص صحي شامل&#10;التأكد من سلامة صحة الطالب&#10;شهادة صحية معتمدة من وزارة الصحة"
                                        backgroundColor="#3d6e4d"
                                      />
                  </Sequence>Sequence>

            {/* متطلبات التسجيل - التحقق من العنوان الوطني */}
                  <Sequence from={450} durationInFrames={150}>
                            <RequirementCard 
                                        title="التحقق من صحة العنوان الوطني"
                                        content="التأكد من صحة بيانات الرقم الوطني&#10;استخدام منصة أبشر للتحقق&#10;العنوان الوطني يجب أن يكون صحيحاً وسارياً"
                                        backgroundColor="#4d825d"
                                      />
                  </Sequence>Sequence>

            {/* الخطوات الإجرائية */}
                  <Sequence from={610} durationInFrames={180}>
                            <ProcessSteps />
                  </Sequence>Sequence>

            {/* الخاتمة */}
                  <Sequence from={800} durationInFrames={120}>
                            <Conclusion />
                  </Sequence>Sequence>
          </AbsoluteFill>AbsoluteFill>
        );
};

// مكون العنوان الرئيسي
const Title = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 60], [0, 1]);

    return (
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'Arial, sans-serif'
          }}>
                            <h1 style={{ fontSize: '64px', margin: 0, fontWeight: 'bold' }}>
                                        متطلبات التسجيل
                            </h1>h1>
                            <h2 style={{ fontSize: '48px', marginTop: '20px', fontWeight: 'normal', color: '#b8d4c8' }}>
                                        الروضة والمرحلة الابتدائية
                            </h2>h2>
                            <p style={{ fontSize: '32px', marginTop: '20px', color: '#a8c8b8' }}>
                                        بالمملكة العربية السعودية
                            </p>p>
                  </div>div>
          </AbsoluteFill>AbsoluteFill>
        );
};

// مكون بطاقة المتطلب
const RequirementCard = ({ title, content, backgroundColor }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const scale = interpolate(frame, [0, 30], [0.8, 1]);

    return (
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
                  <div style={{
                    backgroundColor: backgroundColor,
                    padding: '60px',
                    borderRadius: '20px',
                    maxWidth: '900px',
                    width: '90%',
                    transform: `scale(${scale})`,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontFamily: 'Arial, sans-serif'
          }}>
                            <h2 style={{ fontSize: '48px', margin: '0 0 30px 0', fontWeight: 'bold', textAlign: 'right' }}>
                              {title}
                            </h2>h2>
                            <p style={{ fontSize: '28px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line', textAlign: 'right' }}>
                              {content}
                            </p>p>
                  </div>div>
          </AbsoluteFill>AbsoluteFill>
        );
};

// مكون خطوات العملية
const ProcessSteps = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 60], [0, 1]);

    const steps = [
          'تحضير المستندات المطلوبة',
          'التوجه للمدرسة أو التسجيل الإلكتروني',
          'إجراء الفحص الطبي',
          'التحقق من البيانات والعنوان الوطني',
          'استكمال إجراءات التسجيل',
          'تأكيد التسجيل والحصول على رقم الطالب'
        ];

    return (
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
                  <div style={{
                    backgroundColor: '#2d5a3d',
                    padding: '60px',
                    borderRadius: '20px',
                    maxWidth: '900px',
                    width: '90%',
                    color: '#fff',
                    fontFamily: 'Arial, sans-serif'
          }}>
                            <h2 style={{ fontSize: '48px', margin: '0 0 40px 0', fontWeight: 'bold', textAlign: 'right' }}>
                                        خطوات التسجيل
                            </h2>h2>
                            <ol style={{ fontSize: '28px', lineHeight: '2', margin: 0, paddingRight: '30px', textAlign: 'right' }}>
                              {steps.map((step, index) => (
                        <li key={index} style={{ marginBottom: '20px' }}>
                          {step}
                        </li>li>
                      ))}
                            </ol>ol>
                  </div>div>
          </AbsoluteFill>AbsoluteFill>
        );
};

// مكون الخاتمة
const Conclusion = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 60], [0, 1]);

    return (
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'Arial, sans-serif'
          }}>
                            <h1 style={{ fontSize: '56px', margin: 0, fontWeight: 'bold' }}>
                                        شكراً لمتابعتك
                            </h1>h1>
                            <p style={{ fontSize: '32px', marginTop: '30px', color: '#b8d4c8' }}>
                                        للمزيد من المعلومات، تواصل معنا عبر واتساب
                            </p>p>
                            <p style={{ fontSize: '28px', marginTop: '20px', color: '#a8c8b8' }}>
                                        966+ 545 888 559
                            </p>p>
                  </div>div>
          </AbsoluteFill>AbsoluteFill>
        );
};

export default KindergartenPrimaryRegistration;
