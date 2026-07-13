import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

const GREEN = '#15803D';
const SECTION_GREEN = '#93C47D';
const BORDER = '#000000';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 8.5, fontFamily: 'Helvetica', color: '#000' },

  headerRow: { flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 6 },
  headerLogo: { width: '22%', alignItems: 'center', justifyContent: 'center' },
  logoImg: { width: 90, height: 65, objectFit: 'contain' },
  headerServices: { width: '53%', paddingHorizontal: 6 },
  servicesTitle: { fontSize: 8, fontWeight: 'bold', textDecoration: 'underline', textAlign: 'center', marginBottom: 3 },
  servicesText: { fontSize: 7.5, lineHeight: 1.4, textAlign: 'center' },
  headerAddress: { width: '25%', alignItems: 'center' },
  addressText: { fontSize: 7.5, lineHeight: 1.4, textAlign: 'center', fontWeight: 'bold' },
  addressHighlight: { backgroundColor: '#000', color: '#fff', fontSize: 7.5, fontWeight: 'bold', textAlign: 'center', paddingVertical: 1, marginTop: 2, width: '100%' },

  titleBand: { backgroundColor: GREEN, paddingVertical: 5 },
  titleText: { color: '#fff', fontSize: 13, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1 },

  sectionBar: { backgroundColor: SECTION_GREEN, borderWidth: 1, borderColor: BORDER, borderTopWidth: 0, paddingVertical: 3 },
  sectionBarText: { fontSize: 8.5, fontWeight: 'bold', textAlign: 'center', color: '#000' },
  sectionBarLeft: { backgroundColor: SECTION_GREEN, borderWidth: 1, borderColor: BORDER, borderTopWidth: 0, paddingVertical: 3, paddingHorizontal: 6 },

  table: { borderWidth: 1, borderColor: BORDER, borderTopWidth: 0 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: BORDER },
  rowLast: { flexDirection: 'row' },
  half: { width: '50%', flexDirection: 'row' },
  halfBordered: { width: '50%', flexDirection: 'row', borderRightWidth: 1, borderColor: BORDER },
  quarter: { width: '25%', flexDirection: 'row', borderRightWidth: 1, borderColor: BORDER },
  quarterLast: { width: '25%', flexDirection: 'row' },
  full: { width: '100%', flexDirection: 'row' },
  label: { fontWeight: 'bold', paddingVertical: 4, paddingHorizontal: 5, fontSize: 8.5 },
  value: { paddingVertical: 4, paddingHorizontal: 4, flex: 1, fontSize: 8.5 },

  paragraphBox: { borderWidth: 1, borderColor: BORDER, borderTopWidth: 0, padding: 6 },
  paragraphText: { fontSize: 8.5, lineHeight: 1.4 },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: { width: 9, height: 9, borderWidth: 1, borderColor: '#000', marginRight: 3 },
  checkboxBoxChecked: { backgroundColor: '#000' },
  checkboxGroup: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 4, gap: 14 },

  // Signature rows (NSTC block)
  sigCol: { width: '50%', flexDirection: 'column' },
  sigSubRow: { borderBottomWidth: 1, borderColor: BORDER, minHeight: 30, flexDirection: 'row', alignItems: 'center' },
  sigSubRowLast: { minHeight: 22 },
  sigImageBox: { flex: 1, alignItems: 'flex-end', paddingRight: 8 },
  sigImageInline: { width: 95, height: 30, objectFit: 'contain' },
});

// Inserts an invisible break point into long unbroken strings (numbers, codes, etc.)
// so they wrap inside their box instead of overflowing the page.
function safeWrap(text = '') {
  if (!text) return '';
  return String(text).replace(/(\S{20})(?=\S)/g, '$1\u200B');
}

function Checkbox({ label, checked }) {
  return (
    <View style={styles.checkboxRow}>
      <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]} />
      <Text>{label}</Text>
    </View>
  );
}

export default function PdfTemplate({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLogo}>
            <Image src="/NSTC_logo.png" style={styles.logoImg} />
          </View>
          <View style={styles.headerServices}>
            <Text style={styles.servicesTitle}>SERVICES OFFERED ON THE FOLLOWING SYSTEM:</Text>
            <Text style={styles.servicesText}>
              • CCTV • Access Control • Electric Fence • GPS Tracking{'\n'}
              • Paging • PABX • Fire & Burglar Alarm • Parking & Barrier{'\n'}
              • Smart Home, Buildings, Hotels, & Gate Automation{'\n'}
              • Wi-fi & Wi-max • Structured Cabling
            </Text>
          </View>
          <View style={styles.headerAddress}>
            <Text style={styles.addressText}>
              Unit 1 Corner Complex Bldg.{'\n'}
              No. 12 New York Avenue, Cubao{'\n'}
              Quezon City, Philippines
            </Text>
            <Text style={styles.addressHighlight}>+63(2)415.3047 / www.nstc.com.ph</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleBand}>
          <Text style={styles.titleText}>SERVICE REPORT</Text>
        </View>

        {/* Client Information */}
        <View style={styles.sectionBar}>
          <Text style={styles.sectionBarText}>Client Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Project No:</Text>
              <Text style={styles.value}>{safeWrap(data.projectNo)}</Text>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Client:</Text>
              <Text style={styles.value}>{safeWrap(data.client)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.full}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{safeWrap(data.address)}</Text>
            </View>
          </View>
          <View style={styles.rowLast}>
            <View style={styles.full}>
              <Text style={styles.label}>Contact Person:</Text>
              <Text style={styles.value}>{safeWrap(data.contactPerson)}</Text>
            </View>
          </View>
        </View>

        {/* Service Information */}
        <View style={[styles.sectionBar, { marginTop: 5 }]}>
          <Text style={styles.sectionBarText}>Service Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Service Number:</Text>
              <Text style={styles.value}>{safeWrap(data.serviceNumber)}</Text>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Date Called:</Text>
              <Text style={styles.value}>{data.dateCalled}</Text>
            </View>
          </View>
          <View style={styles.rowLast}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Under Warranty:</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox label="Yes" checked={data.underWarranty === 'yes'} />
                <Checkbox label="No" checked={data.underWarranty === 'no'} />
              </View>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Date Serviced:</Text>
              <Text style={styles.value}>{data.dateServiced}</Text>
            </View>
          </View>
        </View>

        {/* Reported Problem */}
        <View style={[styles.sectionBarLeft, { marginTop: 5 }]}>
          <Text style={{ fontSize: 8.5, fontWeight: 'bold' }}>Reported Problem:</Text>
        </View>
        <View style={[styles.paragraphBox, { minHeight: 55 }]}>
          <Text style={styles.paragraphText}>{safeWrap(data.reportedProblem)}</Text>
        </View>

        {/* Action Taken */}
        <View style={[styles.sectionBarLeft, { marginTop: 5 }]}>
          <Text style={{ fontSize: 8.5, fontWeight: 'bold' }}>Action Taken / Remarks:</Text>
        </View>
        <View style={[styles.paragraphBox, { minHeight: 130 }]}>
          <Text style={styles.paragraphText}>{safeWrap(data.actionTaken)}</Text>
        </View>

        {/* Pending Items */}
        <View style={[styles.sectionBarLeft, { marginTop: 5 }]}>
          <Text style={{ fontSize: 8.5, fontWeight: 'bold' }}>Pending Items:</Text>
        </View>
        <View style={[styles.paragraphBox, { minHeight: 40 }]}>
          <Text style={styles.paragraphText}>{safeWrap(data.pendingItems)}</Text>
        </View>

        {/* NSTC's Representative */}
        <View style={[styles.sectionBar, { marginTop: 5 }]}>
          <Text style={styles.sectionBarText}>NSTC's Representative</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Name(s):</Text>
              <Text style={styles.value}>{safeWrap(data.nstcNames)}</Text>
            </View>
            <View style={styles.sigCol}>
              <View style={styles.sigSubRow}>
                <Text style={styles.label}>Signature of Supervisor / Leadman:</Text>
                <View style={styles.sigImageBox}>
                  {data.nstcSignature && <Image src={data.nstcSignature} style={styles.sigImageInline} />}
                </View>
              </View>
              <View style={[styles.sigSubRow, styles.sigSubRowLast]}>
                <Text style={styles.label}>Contact Number:</Text>
                <Text style={styles.value}>{safeWrap(data.nstcContactNumber)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowLast}>
            <View style={styles.quarter}>
              <Text style={styles.label}>Date In:</Text>
              <Text style={styles.value}>{data.dateIn}</Text>
            </View>
            <View style={styles.quarter}>
              <Text style={styles.label}>Time In:</Text>
              <Text style={styles.value}>{data.timeIn}</Text>
            </View>
            <View style={styles.quarter}>
              <Text style={styles.label}>Date Out:</Text>
              <Text style={styles.value}>{data.dateOut}</Text>
            </View>
            <View style={styles.quarterLast}>
              <Text style={styles.label}>Time Out:</Text>
              <Text style={styles.value}>{data.timeOut}</Text>
            </View>
          </View>
        </View>

        {/* Client's Representative */}
        <View style={[styles.sectionBar, { marginTop: 5 }]}>
          <Text style={styles.sectionBarText}>Client's Representative</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{safeWrap(data.clientRepName)}</Text>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Contact Number:</Text>
              <Text style={styles.value}>{safeWrap(data.clientRepContact)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.full}>
              <Text style={styles.label}>Comment(s):</Text>
              <Text style={styles.value}>{safeWrap(data.clientComments)}</Text>
            </View>
          </View>
          <View style={styles.rowLast}>
            <View style={styles.halfBordered}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{data.clientDate}</Text>
            </View>
            <View style={[styles.half, { minHeight: 32 }]}>
              <Text style={styles.label}>Signature:</Text>
              <View style={styles.sigImageBox}>
                {data.clientSignature && <Image src={data.clientSignature} style={styles.sigImageInline} />}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}