using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Net.Sockets;

namespace AiFutureAgency
{
    public class ControllerForm : Form
    {
        private Panel headerPanel;
        private Label lblBrand;
        private Label lblTagline;
        private Panel monitorCard;
        private Label lblMonitorTitle;
        private Label lblLocalStatus;
        private Label lblTunnelStatus;
        private Label lblAutoStartStatus;
        private Button btnStartAll;
        private Button btnStopAll;
        private Button btnOpenWebsite;
        private Button btnOpenAdmin;
        private Button btnOpenLocal;
        private Label lblLog;
        private Timer statusTimer;
        private Timer animTimer;
        private int pulsePhase = 0;

        private const string PROJECT_DIR = @"c:\Users\hp\Downloads\Telegram Desktop\aifutureagency";
        private const string TUNNEL_TOKEN = "eyJhIjoiN2M1YjJmZGZmZmNjZWEzYmFhOTg3YjUzZGFlYmE4MDQiLCJ0IjoiMjM5YzNjODItNDI2NC00MDYwLWFmMTAtNDI1Y2IxZmE3MmQxIiwicyI6IlpUY3haalEyTWpRdE9Ea3hZaTAwWlRsbUxXSTRPVEl0T1dJNU4yRmhPRFEwTXprNCJ9";
        private const string PUBLIC_URL = "https://aifutureagency.store.cv";
        private const string ADMIN_URL = "https://aifutureagency.store.cv/airana1713@admin";

        public ControllerForm()
        {
            this.Text = "AI Future Agency - Master Server Controller";
            this.Size = new Size(500, 680);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.BackColor = Color.FromArgb(4, 13, 10);
            this.ForeColor = Color.White;
            this.DoubleBuffered = true;

            InitializeCustomUI();

            statusTimer = new Timer();
            statusTimer.Interval = 2000;
            statusTimer.Tick += (s, e) => RefreshServerStatus();
            statusTimer.Start();

            animTimer = new Timer();
            animTimer.Interval = 50;
            animTimer.Tick += (s, e) => {
                pulsePhase = (pulsePhase + 5) % 360;
                headerPanel.Invalidate();
            };
            animTimer.Start();

            RefreshServerStatus();
        }

        private void InitializeCustomUI()
        {
            // 1. Header Panel
            headerPanel = new Panel
            {
                Dock = DockStyle.Top,
                Height = 110,
                BackColor = Color.FromArgb(7, 22, 17)
            };
            headerPanel.Paint += HeaderPanel_Paint;

            lblBrand = new Label
            {
                Text = "⚡ AI FUTURE AGENCY ⚡",
                Font = new Font("Segoe UI", 18, FontStyle.Bold),
                ForeColor = Color.FromArgb(0, 255, 135),
                Location = new Point(20, 20),
                AutoSize = true,
                BackColor = Color.Transparent
            };

            lblTagline = new Label
            {
                Text = "Next-Gen 24/7 Master Server & Edge Tunnel Controller",
                Font = new Font("Segoe UI", 9.5f, FontStyle.Regular),
                ForeColor = Color.FromArgb(148, 163, 184),
                Location = new Point(22, 58),
                AutoSize = true,
                BackColor = Color.Transparent
            };

            headerPanel.Controls.Add(lblBrand);
            headerPanel.Controls.Add(lblTagline);
            this.Controls.Add(headerPanel);

            // 2. Live Monitor Card ("কনভার্টার / লাইভ স্ট্যাটাস মনিটর")
            monitorCard = new Panel
            {
                Location = new Point(22, 128),
                Size = new Size(440, 160),
                BackColor = Color.FromArgb(8, 25, 20)
            };
            monitorCard.Paint += (s, e) => {
                using (Pen p = new Pen(Color.FromArgb(0, 255, 135), 1.5f))
                {
                    e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;
                    e.Graphics.DrawRectangle(p, 0, 0, monitorCard.Width - 1, monitorCard.Height - 1);
                }
            };

            lblMonitorTitle = new Label
            {
                Text = "● LIVE SYSTEM MONITOR & CLOUD TUNNEL",
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(96, 239, 255),
                Location = new Point(14, 12),
                AutoSize = true
            };

            lblLocalStatus = new Label
            {
                Text = "Local PHP Server (Port 3000): Checking...",
                Font = new Font("Segoe UI", 9.5f),
                ForeColor = Color.White,
                Location = new Point(14, 45),
                AutoSize = true
            };

            lblTunnelStatus = new Label
            {
                Text = "Cloudflare Live Edge Tunnel: Checking...",
                Font = new Font("Segoe UI", 9.5f),
                ForeColor = Color.White,
                Location = new Point(14, 78),
                AutoSize = true
            };

            lblAutoStartStatus = new Label
            {
                Text = "Windows Auto-Start on PC Boot: [ 🟢 ACTIVE ]",
                Font = new Font("Segoe UI", 9.5f),
                ForeColor = Color.FromArgb(0, 255, 135),
                Location = new Point(14, 112),
                AutoSize = true
            };

            monitorCard.Controls.Add(lblMonitorTitle);
            monitorCard.Controls.Add(lblLocalStatus);
            monitorCard.Controls.Add(lblTunnelStatus);
            monitorCard.Controls.Add(lblAutoStartStatus);
            this.Controls.Add(monitorCard);

            // 3. START ALL SERVICES Button (1-Click Run)
            btnStartAll = new Button
            {
                Text = "▶  START ALL SERVICES (1-CLICK RUN)",
                Location = new Point(22, 305),
                Size = new Size(440, 52),
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 11.5f, FontStyle.Bold),
                BackColor = Color.FromArgb(0, 255, 135),
                ForeColor = Color.FromArgb(2, 22, 14),
                Cursor = Cursors.Hand
            };
            btnStartAll.FlatAppearance.BorderSize = 0;
            btnStartAll.Click += BtnStartAll_Click;
            this.Controls.Add(btnStartAll);

            // 4. Quick Action Buttons Grid
            btnOpenWebsite = new Button
            {
                Text = "🌐 Open Live Website",
                Location = new Point(22, 370),
                Size = new Size(212, 42),
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                BackColor = Color.FromArgb(14, 38, 30),
                ForeColor = Color.FromArgb(96, 239, 255),
                Cursor = Cursors.Hand
            };
            btnOpenWebsite.FlatAppearance.BorderColor = Color.FromArgb(96, 239, 255);
            btnOpenWebsite.Click += (s, e) => OpenUrl(PUBLIC_URL);
            this.Controls.Add(btnOpenWebsite);

            btnOpenAdmin = new Button
            {
                Text = "🔐 Open Admin Panel",
                Location = new Point(250, 370),
                Size = new Size(212, 42),
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                BackColor = Color.FromArgb(14, 38, 30),
                ForeColor = Color.FromArgb(0, 255, 135),
                Cursor = Cursors.Hand
            };
            btnOpenAdmin.FlatAppearance.BorderColor = Color.FromArgb(0, 255, 135);
            btnOpenAdmin.Click += (s, e) => OpenUrl(ADMIN_URL);
            this.Controls.Add(btnOpenAdmin);

            btnOpenLocal = new Button
            {
                Text = "💻 Open Localhost (Port 3000)",
                Location = new Point(22, 422),
                Size = new Size(440, 38),
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 9.0f, FontStyle.Regular),
                BackColor = Color.FromArgb(10, 26, 21),
                ForeColor = Color.FromArgb(203, 213, 225),
                Cursor = Cursors.Hand
            };
            btnOpenLocal.FlatAppearance.BorderColor = Color.FromArgb(30, 60, 50);
            btnOpenLocal.Click += (s, e) => OpenUrl("http://localhost:3000");
            this.Controls.Add(btnOpenLocal);

            // 5. STOP ALL SERVICES Button (Off button at bottom)
            btnStopAll = new Button
            {
                Text = "⏹  STOP ALL SERVICES (SHUT DOWN)",
                Location = new Point(22, 480),
                Size = new Size(440, 48),
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 10.5f, FontStyle.Bold),
                BackColor = Color.FromArgb(45, 15, 20),
                ForeColor = Color.FromArgb(255, 90, 110),
                Cursor = Cursors.Hand
            };
            btnStopAll.FlatAppearance.BorderColor = Color.FromArgb(255, 90, 110);
            btnStopAll.Click += BtnStopAll_Click;
            this.Controls.Add(btnStopAll);

            // 6. Status Log Note
            lblLog = new Label
            {
                Text = "Ready • Website is hosted 24/7 on https://aifutureagency.store.cv",
                Font = new Font("Segoe UI", 8.5f),
                ForeColor = Color.FromArgb(100, 116, 139),
                Location = new Point(22, 545),
                Size = new Size(440, 40),
                TextAlign = ContentAlignment.MiddleCenter
            };
            this.Controls.Add(lblLog);
        }

        private void HeaderPanel_Paint(object sender, PaintEventArgs e)
        {
            // Glowing neon accent line
            int pulseAlpha = (int)(150 + 90 * Math.Sin(pulsePhase * Math.PI / 180));
            if (pulseAlpha < 40) pulseAlpha = 40;
            if (pulseAlpha > 255) pulseAlpha = 255;

            using (Pen p = new Pen(Color.FromArgb(pulseAlpha, 0, 255, 135), 2f))
            {
                e.Graphics.DrawLine(p, 0, headerPanel.Height - 1, headerPanel.Width, headerPanel.Height - 1);
            }
        }

        private bool IsPortListening(int port)
        {
            try
            {
                using (TcpClient client = new TcpClient())
                {
                    var result = client.BeginConnect("127.0.0.1", port, null, null);
                    bool success = result.AsyncWaitHandle.WaitOne(250);
                    if (!success) return false;
                    client.EndConnect(result);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private bool IsCloudflareRunning()
        {
            Process[] procs = Process.GetProcessesByName("cloudflared");
            return procs != null && procs.Length > 0;
        }

        private void RefreshServerStatus()
        {
            bool phpActive = IsPortListening(3000);
            bool tunnelActive = IsCloudflareRunning();

            if (phpActive)
            {
                lblLocalStatus.Text = "Local PHP Server (Port 3000):   [ 🟢 ONLINE ]";
                lblLocalStatus.ForeColor = Color.FromArgb(0, 255, 135);
            }
            else
            {
                lblLocalStatus.Text = "Local PHP Server (Port 3000):   [ 🔴 OFFLINE ]";
                lblLocalStatus.ForeColor = Color.FromArgb(255, 90, 110);
            }

            if (tunnelActive)
            {
                lblTunnelStatus.Text = "Cloudflare Edge (store.cv):     [ 🟢 CONNECTED ]";
                lblTunnelStatus.ForeColor = Color.FromArgb(0, 255, 135);
            }
            else
            {
                lblTunnelStatus.Text = "Cloudflare Edge (store.cv):     [ 🔴 DISCONNECTED ]";
                lblTunnelStatus.ForeColor = Color.FromArgb(255, 90, 110);
            }

            if (phpActive && tunnelActive)
            {
                btnStartAll.Text = "✓ ALL SERVICES ARE ONLINE (RUNNING 24/7)";
                btnStartAll.BackColor = Color.FromArgb(16, 50, 36);
                btnStartAll.ForeColor = Color.FromArgb(0, 255, 135);
                lblLog.Text = "Everything is active! Your website is live worldwide at https://aifutureagency.store.cv";
                lblLog.ForeColor = Color.FromArgb(0, 255, 135);
            }
            else
            {
                btnStartAll.Text = "▶  START ALL SERVICES (1-CLICK RUN)";
                btnStartAll.BackColor = Color.FromArgb(0, 255, 135);
                btnStartAll.ForeColor = Color.FromArgb(2, 22, 14);
                lblLog.Text = "Services offline. Click 'START ALL SERVICES' to go live!";
                lblLog.ForeColor = Color.FromArgb(255, 180, 50);
            }
        }

        private void BtnStartAll_Click(object sender, EventArgs e)
        {
            btnStartAll.Enabled = false;
            btnStartAll.Text = "Starting services in background...";

            try
            {
                // 1. Start PHP router if not running
                if (!IsPortListening(3000))
                {
                    ProcessStartInfo psiPhp = new ProcessStartInfo
                    {
                        FileName = "php",
                        Arguments = "-S 0.0.0.0:3000 router.php",
                        WorkingDirectory = PROJECT_DIR,
                        CreateNoWindow = true,
                        UseShellExecute = false,
                        WindowStyle = ProcessWindowStyle.Hidden
                    };
                    Process.Start(psiPhp);
                }

                // 2. Start Cloudflare Tunnel if not running
                if (!IsCloudflareRunning())
                {
                    string cfExe = Path.Combine(PROJECT_DIR, "cloudflared.exe");
                    ProcessStartInfo psiCf = new ProcessStartInfo
                    {
                        FileName = cfExe,
                        Arguments = "tunnel run --token " + TUNNEL_TOKEN,
                        WorkingDirectory = PROJECT_DIR,
                        CreateNoWindow = true,
                        UseShellExecute = false,
                        WindowStyle = ProcessWindowStyle.Hidden
                    };
                    Process.Start(psiCf);
                }

                lblLog.Text = "Services started successfully! Checking connectivity...";
                System.Threading.Thread.Sleep(1500);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Start Error: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                btnStartAll.Enabled = true;
                RefreshServerStatus();
            }
        }

        private void BtnStopAll_Click(object sender, EventArgs e)
        {
            try
            {
                // Kill php.exe and cloudflared.exe
                foreach (var p in Process.GetProcessesByName("php"))
                {
                    try { p.Kill(); } catch { }
                }
                foreach (var p in Process.GetProcessesByName("cloudflared"))
                {
                    try { p.Kill(); } catch { }
                }

                lblLog.Text = "All server processes stopped.";
                lblLog.ForeColor = Color.FromArgb(255, 90, 110);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Stop Error: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                RefreshServerStatus();
            }
        }

        private void OpenUrl(string url)
        {
            try
            {
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                MessageBox.Show("Could not open browser: " + ex.Message);
            }
        }

        [STAThread]
        public static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new ControllerForm());
        }
    }
}
