import { FormEvent } from "react"
import { useSettingsForm } from "src/hooks/useSettingsForm"
import styles from "./SettingsPage.module.scss"

const SettingsPage = () => {
  const { settings, updateSetting, resetSettings } = useSettingsForm()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>Application settings</h2>
        <p>Configure workflow preferences for browsing, editing, and protecting your project data.</p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.settingRow}>
          <input
            type="checkbox"
            checked={settings.autoOpenLastProject}
            onChange={(event) => updateSetting("autoOpenLastProject", event.target.checked)}
          />
          <div>
            <span>Auto-open last project</span>
            <p>Automatically open the most recent project path on launch.</p>
          </div>
        </label>

        <label className={styles.settingRow}>
          <input
            type="checkbox"
            checked={settings.enableFilePreview}
            onChange={(event) => updateSetting("enableFilePreview", event.target.checked)}
          />
          <div>
            <span>Enable file preview</span>
            <p>Show quick previews in the Open File view before fully loading the document.</p>
          </div>
        </label>

        <label className={styles.settingRow}>
          <input
            type="checkbox"
            checked={settings.confirmBeforeDeletion}
            onChange={(event) => updateSetting("confirmBeforeDeletion", event.target.checked)}
          />
          <div>
            <span>Confirm before deletion</span>
            <p>Require an explicit confirmation before deleting files or folders.</p>
          </div>
        </label>

        <div className={styles.formActions}>
          <button type="submit">Save Preferences</button>
          <button type="button" onClick={resetSettings}>
            Reset to Defaults
          </button>
        </div>
      </form>
    </section>
  )
}

export default SettingsPage
